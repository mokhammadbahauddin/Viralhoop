import { SeoKeyword, User } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { CreateSeoKeyword, GetSeoKeywords, DeleteSeoKeyword } from 'wasp/server/operations';

export const getSeoKeywords: GetSeoKeywords<void, SeoKeyword[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.SeoKeyword.findMany({
    where: { userId: context.user.id },
    orderBy: { createdAt: 'desc' },
  });
};

type CreateSeoKeywordInput = {
  keyword: string;
};

export const createSeoKeyword: CreateSeoKeyword<CreateSeoKeywordInput, SeoKeyword> = async ({ keyword }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // Simulate volume and difficulty fetching
  const volume = Math.floor(Math.random() * 10000);
  const difficulty = Math.floor(Math.random() * 100);

  return context.entities.SeoKeyword.create({
    data: {
      keyword,
      volume,
      difficulty,
      userId: context.user.id,
    },
  });
};

type DeleteSeoKeywordInput = {
    id: string;
}

export const deleteSeoKeyword: DeleteSeoKeyword<DeleteSeoKeywordInput, SeoKeyword> = async ({ id }, context) => {
  if (!context.user) {
      throw new HttpError(401);
  }

  return context.entities.SeoKeyword.delete({
      where: {
          id,
          userId: context.user.id // Ensure ownership
      }
  })
}
