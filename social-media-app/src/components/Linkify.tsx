"use client";

import Link from "next/link";
import React from "react";
import { LinkIt, LinkItUrl } from "react-linkify-it";
import UserLinkWithTooltip from "./UserLinkWithTooltip";

interface LinkifyProps {
  children: React.ReactNode;
}

export default function Linkify({ children }: LinkifyProps) {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
}

function LinkifyUrl({ children }: LinkifyProps) {
  return (
    <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
  );
}

function LinkifyUsername({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/}
      component={(match, key) => {
        // slice để cắt đi dấu hashtag
        return (
          <UserLinkWithTooltip username={match.slice(1)} key={key}>
            {match}
          </UserLinkWithTooltip>
        );
      }}
    >
      {children}
    </LinkIt>
  );
}

function LinkifyHashtag({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9]+)/}
      component={(match, key) => (
        <Link
          key={key}
          href={`/hashtag/${match.slice(1)}`}
          className="text-primary hover:underline"
          target="_blank"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}
