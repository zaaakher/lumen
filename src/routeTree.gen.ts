/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as AppRootImport } from "./routes/_appRoot"
import { Route as AppRootIndexImport } from "./routes/_appRoot.index"
import { Route as ShareGistIdImport } from "./routes/share.$gistId"
import { Route as AppRootSettingsImport } from "./routes/_appRoot.settings"
import { Route as AppRootFileImport } from "./routes/_appRoot.file"
import { Route as AppRootTagsIndexImport } from "./routes/_appRoot.tags.index"
import { Route as AppRootNotesIndexImport } from "./routes/_appRoot.notes.index"
import { Route as AppRootTagsSplatImport } from "./routes/_appRoot.tags_.$"
import { Route as AppRootNotesSplatImport } from "./routes/_appRoot.notes_.$"

// Create/Update Routes

const AppRootRoute = AppRootImport.update({
  id: "/_appRoot",
  getParentRoute: () => rootRoute,
} as any)

const AppRootIndexRoute = AppRootIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRootRoute,
} as any)

const ShareGistIdRoute = ShareGistIdImport.update({
  id: "/share/$gistId",
  path: "/share/$gistId",
  getParentRoute: () => rootRoute,
} as any)

const AppRootSettingsRoute = AppRootSettingsImport.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppRootRoute,
} as any)

const AppRootFileRoute = AppRootFileImport.update({
  id: "/file",
  path: "/file",
  getParentRoute: () => AppRootRoute,
} as any)

const AppRootTagsIndexRoute = AppRootTagsIndexImport.update({
  id: "/tags/",
  path: "/tags/",
  getParentRoute: () => AppRootRoute,
} as any)

const AppRootNotesIndexRoute = AppRootNotesIndexImport.update({
  id: "/notes/",
  path: "/notes/",
  getParentRoute: () => AppRootRoute,
} as any)

const AppRootTagsSplatRoute = AppRootTagsSplatImport.update({
  id: "/tags_/$",
  path: "/tags/$",
  getParentRoute: () => AppRootRoute,
} as any)

const AppRootNotesSplatRoute = AppRootNotesSplatImport.update({
  id: "/notes_/$",
  path: "/notes/$",
  getParentRoute: () => AppRootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_appRoot": {
      id: "/_appRoot"
      path: ""
      fullPath: ""
      preLoaderRoute: typeof AppRootImport
      parentRoute: typeof rootRoute
    }
    "/_appRoot/file": {
      id: "/_appRoot/file"
      path: "/file"
      fullPath: "/file"
      preLoaderRoute: typeof AppRootFileImport
      parentRoute: typeof AppRootImport
    }
    "/_appRoot/settings": {
      id: "/_appRoot/settings"
      path: "/settings"
      fullPath: "/settings"
      preLoaderRoute: typeof AppRootSettingsImport
      parentRoute: typeof AppRootImport
    }
    "/share/$gistId": {
      id: "/share/$gistId"
      path: "/share/$gistId"
      fullPath: "/share/$gistId"
      preLoaderRoute: typeof ShareGistIdImport
      parentRoute: typeof rootRoute
    }
    "/_appRoot/": {
      id: "/_appRoot/"
      path: "/"
      fullPath: "/"
      preLoaderRoute: typeof AppRootIndexImport
      parentRoute: typeof AppRootImport
    }
    "/_appRoot/notes_/$": {
      id: "/_appRoot/notes_/$"
      path: "/notes/$"
      fullPath: "/notes/$"
      preLoaderRoute: typeof AppRootNotesSplatImport
      parentRoute: typeof AppRootImport
    }
    "/_appRoot/tags_/$": {
      id: "/_appRoot/tags_/$"
      path: "/tags/$"
      fullPath: "/tags/$"
      preLoaderRoute: typeof AppRootTagsSplatImport
      parentRoute: typeof AppRootImport
    }
    "/_appRoot/notes/": {
      id: "/_appRoot/notes/"
      path: "/notes"
      fullPath: "/notes"
      preLoaderRoute: typeof AppRootNotesIndexImport
      parentRoute: typeof AppRootImport
    }
    "/_appRoot/tags/": {
      id: "/_appRoot/tags/"
      path: "/tags"
      fullPath: "/tags"
      preLoaderRoute: typeof AppRootTagsIndexImport
      parentRoute: typeof AppRootImport
    }
  }
}

// Create and export the route tree

interface AppRootRouteChildren {
  AppRootFileRoute: typeof AppRootFileRoute
  AppRootSettingsRoute: typeof AppRootSettingsRoute
  AppRootIndexRoute: typeof AppRootIndexRoute
  AppRootNotesSplatRoute: typeof AppRootNotesSplatRoute
  AppRootTagsSplatRoute: typeof AppRootTagsSplatRoute
  AppRootNotesIndexRoute: typeof AppRootNotesIndexRoute
  AppRootTagsIndexRoute: typeof AppRootTagsIndexRoute
}

const AppRootRouteChildren: AppRootRouteChildren = {
  AppRootFileRoute: AppRootFileRoute,
  AppRootSettingsRoute: AppRootSettingsRoute,
  AppRootIndexRoute: AppRootIndexRoute,
  AppRootNotesSplatRoute: AppRootNotesSplatRoute,
  AppRootTagsSplatRoute: AppRootTagsSplatRoute,
  AppRootNotesIndexRoute: AppRootNotesIndexRoute,
  AppRootTagsIndexRoute: AppRootTagsIndexRoute,
}

const AppRootRouteWithChildren = AppRootRoute._addFileChildren(AppRootRouteChildren)

export interface FileRoutesByFullPath {
  "": typeof AppRootRouteWithChildren
  "/file": typeof AppRootFileRoute
  "/settings": typeof AppRootSettingsRoute
  "/share/$gistId": typeof ShareGistIdRoute
  "/": typeof AppRootIndexRoute
  "/notes/$": typeof AppRootNotesSplatRoute
  "/tags/$": typeof AppRootTagsSplatRoute
  "/notes": typeof AppRootNotesIndexRoute
  "/tags": typeof AppRootTagsIndexRoute
}

export interface FileRoutesByTo {
  "/file": typeof AppRootFileRoute
  "/settings": typeof AppRootSettingsRoute
  "/share/$gistId": typeof ShareGistIdRoute
  "/": typeof AppRootIndexRoute
  "/notes/$": typeof AppRootNotesSplatRoute
  "/tags/$": typeof AppRootTagsSplatRoute
  "/notes": typeof AppRootNotesIndexRoute
  "/tags": typeof AppRootTagsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  "/_appRoot": typeof AppRootRouteWithChildren
  "/_appRoot/file": typeof AppRootFileRoute
  "/_appRoot/settings": typeof AppRootSettingsRoute
  "/share/$gistId": typeof ShareGistIdRoute
  "/_appRoot/": typeof AppRootIndexRoute
  "/_appRoot/notes_/$": typeof AppRootNotesSplatRoute
  "/_appRoot/tags_/$": typeof AppRootTagsSplatRoute
  "/_appRoot/notes/": typeof AppRootNotesIndexRoute
  "/_appRoot/tags/": typeof AppRootTagsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ""
    | "/file"
    | "/settings"
    | "/share/$gistId"
    | "/"
    | "/notes/$"
    | "/tags/$"
    | "/notes"
    | "/tags"
  fileRoutesByTo: FileRoutesByTo
  to: "/file" | "/settings" | "/share/$gistId" | "/" | "/notes/$" | "/tags/$" | "/notes" | "/tags"
  id:
    | "__root__"
    | "/_appRoot"
    | "/_appRoot/file"
    | "/_appRoot/settings"
    | "/share/$gistId"
    | "/_appRoot/"
    | "/_appRoot/notes_/$"
    | "/_appRoot/tags_/$"
    | "/_appRoot/notes/"
    | "/_appRoot/tags/"
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRootRoute: typeof AppRootRouteWithChildren
  ShareGistIdRoute: typeof ShareGistIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  AppRootRoute: AppRootRouteWithChildren,
  ShareGistIdRoute: ShareGistIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_appRoot",
        "/share/$gistId"
      ]
    },
    "/_appRoot": {
      "filePath": "_appRoot.tsx",
      "children": [
        "/_appRoot/file",
        "/_appRoot/settings",
        "/_appRoot/",
        "/_appRoot/notes_/$",
        "/_appRoot/tags_/$",
        "/_appRoot/notes/",
        "/_appRoot/tags/"
      ]
    },
    "/_appRoot/file": {
      "filePath": "_appRoot.file.tsx",
      "parent": "/_appRoot"
    },
    "/_appRoot/settings": {
      "filePath": "_appRoot.settings.tsx",
      "parent": "/_appRoot"
    },
    "/share/$gistId": {
      "filePath": "share.$gistId.tsx"
    },
    "/_appRoot/": {
      "filePath": "_appRoot.index.tsx",
      "parent": "/_appRoot"
    },
    "/_appRoot/notes_/$": {
      "filePath": "_appRoot.notes_.$.tsx",
      "parent": "/_appRoot"
    },
    "/_appRoot/tags_/$": {
      "filePath": "_appRoot.tags_.$.tsx",
      "parent": "/_appRoot"
    },
    "/_appRoot/notes/": {
      "filePath": "_appRoot.notes.index.tsx",
      "parent": "/_appRoot"
    },
    "/_appRoot/tags/": {
      "filePath": "_appRoot.tags.index.tsx",
      "parent": "/_appRoot"
    }
  }
}
ROUTE_MANIFEST_END */
