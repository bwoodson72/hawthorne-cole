import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from 'astro:content';

export async function getAttorneyRelationships(attorney: CollectionEntry<'attorneys'>) {
  const [practiceAreas, insights, matters] = await Promise.all([
    getEntries(attorney.data.practiceAreas),
    getCollection('insights', ({ data }) => data.author.id === attorney.id),
    getCollection('matters', ({ data }) =>
      data.attorneys.some(({ id }) => id === attorney.id),
    ),
  ]);

  return { practiceAreas, insights, matters };
}

export async function getPracticeAreaRelationships(
  practiceArea: CollectionEntry<'practiceAreas'>,
) {
  const [attorneys, insights, matters] = await Promise.all([
    getCollection('attorneys', ({ data }) =>
      data.practiceAreas.some(({ id }) => id === practiceArea.id),
    ),
    getCollection('insights', ({ data }) => data.practiceArea.id === practiceArea.id),
    getCollection('matters', ({ data }) => data.practiceArea.id === practiceArea.id),
  ]);

  return { attorneys, insights, matters };
}

export async function getInsightRelationships(insight: CollectionEntry<'insights'>) {
  const [author, practiceArea] = await Promise.all([
    getEntry(insight.data.author),
    getEntry(insight.data.practiceArea),
  ]);

  return { author, practiceArea };
}

export async function getMatterRelationships(matter: CollectionEntry<'matters'>) {
  const [practiceArea, attorneys] = await Promise.all([
    getEntry(matter.data.practiceArea),
    getEntries(matter.data.attorneys),
  ]);

  return { practiceArea, attorneys };
}
