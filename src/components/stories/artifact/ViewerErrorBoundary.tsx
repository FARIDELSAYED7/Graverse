"use client";

import { Component } from "react";
import type { ReactNode } from "react";

/**
 * A small error boundary for the 3D viewer.
 *
 * A model that fails to load must not take the story down with it: the
 * reader gets an explanation and the rest of the chapter keeps working.
 */
export class ViewerErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}
