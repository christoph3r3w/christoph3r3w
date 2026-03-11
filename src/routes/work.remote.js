import { query } from "$app/server";
import { load } from "./+page.server";

export const next = query(async () => {
	const { projects } = await load();
	return await projects;
});