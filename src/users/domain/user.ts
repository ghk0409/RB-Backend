// User 도메인 클래스
export class User {
    constructor(
        private id: string,
        private email: string,
        private password: string,
        private name: string | null,
        private signupVerifyToken: string,
    ) {}

    // 유저 ID 반환 (id는 ulid 값)
    getId(): Readonly<string> {
        return this.id;
    }
    // 유저 Email 반환
    getEmail(): Readonly<string> {
        return this.email;
    }
    // 유저 Name 반환
    getName(): Readonly<string | null> {
        return this.name;
    }
}
