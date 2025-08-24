import type { UserMessages } from './types';

export const user: UserMessages = {
  // 성공 메시지
  createSuccess: '사용자가 생성되었습니다.',
  createError: '사용자 생성 중 오류가 발생했습니다.',
  updateSuccess: '사용자 정보가 수정되었습니다.',
  updateError: '사용자 정보 수정 중 오류가 발생했습니다.',
  passwordChangeSuccess: '비밀번호가 변경되었습니다.',
  passwordChangeError: '비밀번호 변경 중 오류가 발생했습니다.',
  imageChangeSuccess: '프로필 이미지가 변경되었습니다.',
  imageChangeError: '프로필 이미지 변경 중 오류가 발생했습니다.',
  listSuccess: '사용자 목록을 조회했습니다.',
  listError: '사용자 목록 조회에 실패했습니다.',
  fetchSuccess: '사용자 정보를 조회했습니다.',
  fetchError: '사용자 정보 조회에 실패했습니다.',
  deleteSuccess: '사용자가 삭제되었습니다.',
  deleteError: '사용자 삭제 중 오류가 발생했습니다.',
  profileUpdated: '프로필이 성공적으로 수정되었습니다.',

  // 에러 메시지
  emailExists: '해당 이메일은 이미 사용 중입니다.',
  nameExists: '해당 이름은 이미 존재합니다.',
  notFound: '해당 사용자를 찾을 수 없습니다.',
  userNotFound: '사용자를 찾을 수 없습니다.',
  profileUpdateFailed: '프로필 업데이트에 실패했습니다.',
  profileValidationFailed: '프로필 정보가 올바르지 않습니다.',
  profileDataRequired: '필수 프로필 정보가 누락되었습니다.',
  profileEmailInvalid: '올바른 이메일 형식이 아닙니다.',
  profileNameRequired: '이름은 필수 입력 항목입니다.',
  profileNameTooLong: '이름은 50자를 초과할 수 없습니다.',
  profileBioTooLong: '자기소개는 500자를 초과할 수 없습니다.',
  profileImageInvalid: '올바른 이미지 파일이 아닙니다.',
}; 