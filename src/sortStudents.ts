
export interface Student {
  name: string;
  surname : string;
  age: number;
  married: boolean;
  grades: number[];
}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'averageGrade'

}

// create SortOrder type
export type SortOrder = 'asc' | 'desc';

export const sortStudents = (
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] => {
  const arrayStudents = [...students];

  arrayStudents.sort((
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    a: Student & Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    b: Student & Record<string, any>,
  ) => {
    const keyA = a?.[sortBy];
    const keyB = b?.[sortBy];

    if (typeof keyA === 'string' && typeof keyB === 'string') {
      return order === 'asc' ? keyA.localeCompare(keyB)
        : keyB.localeCompare(keyA);
    }

    if (typeof keyA === 'object') {
      const totalGradeA = (keyA as number[]).reduce(
        // eslint-disable-next-line no-param-reassign
        (acc, curr) => (acc += curr), 0,
      ) / (keyA as number[]).length;

      const totalGradeB = (keyB as number[]).reduce(
        // eslint-disable-next-line no-param-reassign
        (acc, curr) => (acc += curr), 0,
      ) / (keyB as number[]).length;

      return order === 'asc' ? totalGradeA - totalGradeB
        : totalGradeB - totalGradeA;
    }

    if (typeof keyA === 'boolean' && typeof keyB === 'boolean') {
      if (!keyA && keyB) {
        return 1;
      }

      if (keyA && !keyB) {
        return -1;
      }

      return 0;
    }

    return order === 'asc' ? keyA - keyB : keyB - keyA;
  });

  return arrayStudents;
};
