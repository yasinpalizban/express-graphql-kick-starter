import { settingSchema } from "@/modules/common/schemas/setting.schema";

process.env["NODE_CONFIG_DIR"] = __dirname + "/core/configs";
import "dotenv/config";
import App from "./app";
import { merge } from "lodash";
import { mergeSchemaGraphql } from "./core/utils/merge.graphql.type";
import { authSchema } from "@/modules/auth/schemas/auth.schema";
import { profileSchema } from "@/modules/common/schemas/profile.schema";
import { AuthResolver } from "@/modules/auth/resolvers/auth.resolver";
import { ProfileResolver } from "@/modules/common/resolvers/profile.resolver";
import { SettingResolver } from "@/modules/common/resolvers/setting.resolver";
import { sharedSchema } from "@/modules/shared/schemas/shared.schema";
import { OverViewResolver } from "@/modules/app/resolvers/over.view.resolver";
import { overViewSchema } from "@/modules/app/schemas/over.view.schema";
import { graphSchema } from "@/modules/app/schemas/graph.schema";
import { GraphResolver } from "@/modules/app/resolvers/graph.resolver";
import { UserResolver } from "@/modules/common/resolvers/user.resolver";
import { userSchema } from "@/modules/common/schemas/user.schema";
import { GroupResolver } from "@/modules/auth/resolvers/group.resolver";
import { groupSchema } from "@/modules/auth/schemas/group.schema";
import { PermissionResolver } from "@/modules/auth/resolvers/permission.resolver";
import { permissionSchema } from "@/modules/auth/schemas/permission.schema";
import { UserPermissionResolver } from "@/modules/auth/resolvers/user.permission.resolver";
import { GroupPermissionResolver } from "@/modules/auth/resolvers/group.permission.resolver";
import { groupPermissionSchema } from "@/modules/auth/schemas/group.permission.schema";
import { userPermissionSchema } from "@/modules/auth/schemas/user.permission.schema";

const schema = mergeSchemaGraphql(
  sharedSchema,
  authSchema,
  groupSchema,
  permissionSchema,
  groupPermissionSchema,
  userPermissionSchema,
  profileSchema,
  settingSchema,
  userSchema,
  overViewSchema,
  graphSchema
);

const resolver = merge(
  AuthResolver,
  GroupResolver,
  PermissionResolver,
  UserPermissionResolver,
  GroupPermissionResolver,
  ProfileResolver,
  SettingResolver,
  UserResolver,
  OverViewResolver,
  GraphResolver);

const app = new App(schema, resolver);
app.listen();


