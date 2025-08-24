import type { CommonMessages } from './types';

export const common: CommonMessages = {
  success: '요청이 성공적으로 처리되었습니다.',
  error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  unauthorized: '권한이 없습니다.',
  forbidden: '접근이 금지되었습니다.',
  notFound: '요청한 리소스를 찾을 수 없습니다.',
  invalidRequest: '잘못된 요청입니다.',
  alreadyExists: '이미 존재하는 항목입니다.',
  deleted: '성공적으로 삭제되었습니다.',
  internalServerError: '서버 내부 오류가 발생했습니다.',
}; 