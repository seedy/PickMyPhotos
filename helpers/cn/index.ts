import type { CxOptions } from "class-variance-authority";
import { cx } from "class-variance-authority";
import { twJoin, twMerge } from "tailwind-merge";

const cn = (...inputs: CxOptions) => twMerge(cx(inputs));
export default cn;

export const joinCn = (...inputs: CxOptions) => twJoin(cx(inputs));
