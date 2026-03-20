#!/bin/bash
# Initialize Next.js project with automated responses

{
  echo "No"    # React Compiler
  echo "Yes"   # src/ directory
} | npx create-next-app@latest . --typescript --tailwind --eslint --app --import-alias '@/*' --no-git
