// @repo/message 패키지에서 메시지를 import
export { messages } from '@repo/message';

// 기존 messageData는 하위 호환성을 위해 유지하되 새 패키지의 messages를 사용
export const messageData = messages;
