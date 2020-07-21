// Model for Objects and Adapters in Application
export class Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

export class Team {
  id: number;
  teamName: string;
}

export class Adapters {
  /**
   * Adapt Member data on recieving it if necessary
   * @param data
   */
  MemberAdapter(data: any): Member {
    return data as Member;
  }

  /**
   * Adapt Members data on recieving it if necessary
   * @param data
   */
  MembersAdapter(data: any): Member[] {
    return data as Member[];
  }

  /**
   * Adapt Team data on recieving it if necessary
   * @param data
   */
  TeamAdapter(data: any): Team[] {
    return data as Team[];
  }
}
