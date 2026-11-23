import { differenceInDays, startOfDay, parseISO } from 'date-fns';

export const diferencaEmDias = (inicio, fim) => {
  const dataInicio = typeof inicio === 'string' ? parseISO(inicio) : inicio;
  const dataFim = typeof fim === 'string' ? parseISO(fim) : fim;

  return differenceInDays(startOfDay(dataInicio), startOfDay(dataFim));
};