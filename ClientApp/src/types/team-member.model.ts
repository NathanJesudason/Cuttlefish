/**
 * All types and functions related to team members
 */


/**
 * The data for a team member
 * @property `id` - The id of the team member
 * @property `username` - The username of the team member
 * @property `password` - The password of the team member
 * @property `email` - The email of the team member
 * @property `roles` - The roles of the team member, as a comma-separated string
 */
export class TeamMember {
    id: number = 0
    username: string = ""
    password: string = ""
    email: string = ""
    roles: string = ""

    /*
    could also possibly use a constructor to initialize
    i.e.
    constructor(){
         this.team_memberID=0 
         ...
     }
     */
}
