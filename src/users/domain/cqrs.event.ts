// 이벤트 핸들러에서 이벤트를 구분하기 위한 추상 클래스
export abstract class CqrsEvent {
  constructor(readonly name: string) {}
}
