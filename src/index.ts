//本文件index.ts是用于测试配置文件是否连接成功的 用命令 npx ts-node src/index.ts来执行和验证

import AppDataSource  from "../ormconfig"
import { User } from "./entities/user.entity"

AppDataSource.initialize().then(async () => {

    const res = await AppDataSource.manager.find(User)
    

    console.log("Here you can setup and run express / fastify / any other framework.",
    res,
    )

}).catch(error => console.log(error))
