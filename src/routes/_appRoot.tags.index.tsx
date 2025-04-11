import { createFileRoute, Link } from "@tanstack/react-router"
import { useAtomValue } from "jotai"
import { useDeferredValue, useMemo, useState } from "react"
import { AppLayout } from "../components/app-layout"
import { GridIcon16, ListIcon16, SortIcon16, TagIcon16 } from "../components/icons"
import { PillButton } from "../components/pill-button"
import { SearchInput } from "../components/search-input"
import { sortedTagEntriesAtom, tagSearcherAtom } from "../global-state"
import { pluralize } from "../utils/pluralize"
import { DropdownMenu } from "../components/dropdown-menu"
import { cx } from "../utils/cx"
import { IconButton } from "../components/icon-button"

type RouteSearch = {
  query: string | undefined
  sort: "name" | "count"
  view: "grid" | "list"
}

export const Route = createFileRoute("/_appRoot/tags/")({
  validateSearch: (search: Record<string, unknown>): RouteSearch => {
    return {
      query: typeof search.query === "string" ? search.query : undefined,
      sort: search.sort === "name" || search.sort === "count" ? search.sort : "name",
      view: search.view === "grid" || search.view === "list" ? search.view : "grid",
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Tags · Lumen" }],
  }),
})

function RouteComponent() {
  const { query, sort, view } = Route.useSearch()
  const navigate = Route.useNavigate()

  const sortedTagEntries = useAtomValue(sortedTagEntriesAtom)
  const tagSearcher = useAtomValue(tagSearcherAtom)

  const deferredQuery = useDeferredValue(query)

  const searchResults = useMemo(() => {
    return deferredQuery ? tagSearcher.search(deferredQuery) : sortedTagEntries
  }, [tagSearcher, deferredQuery, sortedTagEntries])

  const tagTree = useMemo(() => buildTagTree(searchResults), [searchResults])

  return (
    <AppLayout title="Tags" icon={<TagIcon16 />}>
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[1fr_auto_auto] gap-2">
            <SearchInput
              placeholder={`Search ${pluralize(sortedTagEntries.length, "tag")}…`}
              value={query ?? ""}
              onChange={(value) =>
                navigate({ search: { query: value, sort, view }, replace: true })
              }
            />
            {/* view mode and sorting */}
            <IconButton
              aria-label={view === "grid" ? "List view" : "Grid view"}
              className="h-10 w-10 rounded-lg bg-bg-secondary hover:bg-bg-tertiary eink:ring-1 eink:ring-inset eink:ring-border eink:focus-visible:ring-2 coarse:h-12 coarse:w-12"
              onClick={() =>
                navigate({ search: { query, sort, view: view === "grid" ? "list" : "grid" } })
              }
            >
              {view === "grid" ? <ListIcon16 /> : <GridIcon16 />}
            </IconButton>
            <DropdownMenu modal={false}>
              <DropdownMenu.Trigger asChild>
                <IconButton
                  aria-label="Sort"
                  className="h-10 w-10 rounded-lg bg-bg-secondary hover:bg-bg-tertiary eink:ring-1 eink:ring-inset eink:ring-border eink:focus-visible:ring-2 coarse:h-12 coarse:w-12"
                >
                  <SortIcon16 />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  onSelect={() => navigate({ search: { query, sort: "name", view } })}
                >
                  <span>Name</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => navigate({ search: { query, sort: "count", view } })}
                >
                  <span>Count</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
          <div className="flex flex-row gap-2"></div>
          {deferredQuery ? (
            <span className="text-sm text-text-secondary">
              {pluralize(searchResults.length, "result")}
            </span>
          ) : null}
        </div>

        <TagTree tree={tagTree} sortBy={sort} viewAs={view} />
      </div>
    </AppLayout>
  )
}

type TagTreeNode = {
  name: string
  count: number
  children: TagTreeNode[]
}

/** Build a tree from a flat list of tags */
function buildTagTree(tags: [string, string[]][]): TagTreeNode[] {
  const tree: TagTreeNode[] = []

  for (const [name, noteIds] of tags) {
    const parts = name.split("/")

    let parent = tree

    for (const part of parts) {
      const existing = parent.find((node) => node.name === part)

      if (existing) {
        parent = existing.children
      } else {
        const node = { name: part, count: noteIds.length, children: [] }
        parent.push(node)
        parent = node.children
      }
    }
  }

  return tree
}

type TagTreeProps = {
  tree: TagTreeNode[]
  path?: string[]
  depth?: number
  sortBy?: "name" | "count"
  viewAs?: "grid" | "list"
}

function TagTree({ tree, path = [], depth = 0, sortBy, viewAs }: TagTreeProps) {
  if (tree.length === 0) {
    return null
  }

  // For grid view, flatten the tree and show full paths
  if (viewAs === "grid") {
    const flattenedTags: Array<{ fullPath: string; count: number }> = []

    function flattenTree(nodes: TagTreeNode[], currentPath: string[] = []) {
      for (const node of nodes) {
        const fullPath = [...currentPath, node.name]
        flattenedTags.push({
          fullPath: fullPath.join("/"),
          count: node.count,
        })
        flattenTree(node.children, fullPath)
      }
    }

    flattenTree(tree)

    // Sort the flattened tags
    const sortedTags = [...flattenedTags].sort((a, b) => {
      if (sortBy === "name") {
        return a.fullPath.localeCompare(b.fullPath)
      } else if (sortBy === "count") {
        return b.count - a.count
      }
      return 0
    })

    return (
      <ul className="flex flex-row flex-wrap gap-3">
        {sortedTags.map((tag) => (
          <li key={tag.fullPath}>
            <PillButton asChild>
              <Link
                to="/tags/$"
                params={{ _splat: tag.fullPath }}
                search={{
                  query: undefined,
                  view: "grid",
                  sort: "name",
                }}
              >
                {tag.fullPath}
                <span className="text-text-secondary">{tag.count}</span>
              </Link>
            </PillButton>
          </li>
        ))}
      </ul>
    )
  }

  // For list view, keep the existing nested structure
  const sortedTree = [...tree].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "count") {
      return b.count - a.count
    }
    return 0
  })

  return (
    <ul className="flex flex-col gap-3">
      {sortedTree.map((node) => {
        return (
          <TagTreeItem
            key={node.name}
            node={node}
            path={path}
            depth={depth}
            viewAs={viewAs}
            sortBy={sortBy}
          />
        )
      })}
    </ul>
  )
}

type TagTreeItemProps = {
  node: TagTreeNode
  path?: string[]
  depth?: number
  viewAs?: "grid" | "list"
  sortBy?: "name" | "count"
}

function TagTreeItem({ node, path = [], depth = 0, viewAs, sortBy }: TagTreeItemProps) {
  return (
    <li className="flex flex-col gap-3">
      <div
        className="flex items-center gap-1"
        style={{ paddingLeft: viewAs === "list" ? `calc(${depth} * 1.5rem)` : 0 }}
      >
        <PillButton asChild>
          <Link
            to="/tags/$"
            params={{ _splat: [...path, node.name].join("/") }}
            search={{
              query: undefined,
              view: "grid",
              sort: "name",
            }}
          >
            {node.name}
            <span className="text-text-secondary">{node.count}</span>
          </Link>
        </PillButton>
      </div>
      {viewAs === "list" && (
        <div className="empty:hidden">
          <TagTree
            key={node.name}
            tree={node.children}
            path={[...path, node.name]}
            depth={depth + 1}
            viewAs={viewAs}
            sortBy={sortBy}
          />
        </div>
      )}
    </li>
  )
}
