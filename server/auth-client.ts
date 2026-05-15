import { sentinelClient } from "@better-auth/infra/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "@/server/auth";

export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<typeof auth>(), sentinelClient()],
});
