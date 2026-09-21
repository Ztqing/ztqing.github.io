#!/usr/bin/env bash
# Jekyll/Sass reads source files using Ruby's default external encoding.
# When no UTF-8 locale is set (common in non-interactive shells), Ruby falls
# back to US-ASCII and the SCSS build aborts with
#   Invalid US-ASCII character "\xE2"
# on files that contain non-ASCII characters. Pin a UTF-8 locale here.
export LANG="${LANG:-en_US.UTF-8}"
export LC_ALL="${LC_ALL:-en_US.UTF-8}"

bundle exec jekyll liveserve
