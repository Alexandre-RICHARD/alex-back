export function mapNullableDateToStringOrNull(
	date: Date | null,
): string | null {
	return date?.toISOString() ?? null;
}
