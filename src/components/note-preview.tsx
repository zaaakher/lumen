import { Note } from "../schema"
import { cx } from "../utils/cx"
import { formatDateDistance, formatWeekDistance } from "../utils/date"
import { CalendarDateIcon16, CalendarIcon16 } from "./icons"
import { useLinkHighlight } from "./link-highlight-provider"
import { Markdown } from "./markdown"

const NUM_VISIBLE_TAGS = 4

export function NotePreview({ note }: { note: Note }) {
  const highlightedHrefs = useLinkHighlight()

  return (
    <div
      {...{ inert: "" }}
      className="flex aspect-[5/3] w-full flex-col gap-1.5 overflow-hidden p-3 [contain:layout_paint]"
    >
      {(note.type === "daily" || note.type === "weekly") && !note.title ? (
        <div className="flex h-6 items-center gap-2.5 pr-8 coarse:pr-10">
          <div className="grid h-5 w-5 place-items-center">
            {note.type === "daily" ? (
              <CalendarDateIcon16
                date={new Date(note.id).getUTCDate()}
                className="h-4 w-4 text-text-secondary coarse:h-5 coarse:w-5"
              />
            ) : (
              <CalendarIcon16 className="h-4 w-4 text-text-secondary coarse:h-5 coarse:w-5" />
            )}
          </div>
          <div className="flex w-0 flex-grow items-baseline gap-2.5">
            <span className="truncate font-semibold">{note.displayName}</span>
            <span className="truncate text-sm text-text-secondary">
              {note.type === "daily" ? formatDateDistance(note.id) : formatWeekDistance(note.id)}
            </span>
          </div>
        </div>
      ) : null}
      <div className="flex-grow overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)] [&_*::-webkit-scrollbar]:hidden">
        <div className="w-[125%] origin-top-left scale-[80%]">
          <Markdown hideFrontmatter>{note.content}</Markdown>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 pr-10 coarse:pr-12">
        {note.tags.slice(0, NUM_VISIBLE_TAGS).map((tag) => (
          <div
            key={tag}
            className={cx(
              "flex h-5 items-center rounded-full px-1.5 text-sm",
              highlightedHrefs.includes(`/tags/${tag}`)
                ? "bg-bg-highlight text-text-highlight"
                : "bg-bg-secondary text-text-secondary",
            )}
          >
            {tag}
          </div>
        ))}
        {note.tags.length > NUM_VISIBLE_TAGS ? (
          <div className="flex h-5 items-center rounded-full bg-bg-secondary px-1.5 text-sm text-text-secondary">
            +{note.tags.length - NUM_VISIBLE_TAGS}
          </div>
        ) : null}
      </div>
    </div>
  )
}
