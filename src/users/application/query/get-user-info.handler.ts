import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserInfoQuery } from './get-user-info.query';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
  // constructor() {}

  async execute(query: GetUserInfoQuery): Promise<any> {
    const { authUser } = query;

    const email = authUser.getEmail();
    const name = authUser.getName();
    const role = authUser.getRole();

    return {
      email,
      name,
      role,
    };
  }
}
