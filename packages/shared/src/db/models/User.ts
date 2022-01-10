import { Model, ModelObject, RelationMappings } from "objection";

export class User extends Model {
  id?: string;
  email?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;

  static tableName: string = "users";

  static getIdColumn(): string {
    return "id";
  }
  static jsonSchema = {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
      email: { type: ["string", "null"] },
      password: { type: ["string", "null"] },
      created_at: { type: ["number", "string", "null"] },
      updated_at: { type: ["number", "string", "null"] },
    },
  };

  static relationMappings = (): RelationMappings => ({});
}

export type UserInterface = ModelObject<User>;

export default User;