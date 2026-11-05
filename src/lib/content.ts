import { getCollection } from 'astro:content';

export async function getAll() {
  const work = (await getCollection('work')).sort(
    (a, b) => b.data.start.valueOf() - a.data.start.valueOf(),
  );
  const education = (await getCollection('education')).sort(
    (a, b) => b.data.start.valueOf() - a.data.start.valueOf(),
  );
  return { work, education };
}

export function fmtRange(start: Date, end?: Date) {
  const f = (d: Date) =>
    d.toLocaleString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  return end ? `${f(start)} — ${f(end)}` : `${f(start)} — Present`;
}