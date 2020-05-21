import Koa from "koa";
import { Controller, Http } from '../decorator/http';
import Redis from '../service/redis';
import { ResSuccess, ResError, CodeAndMessage } from '../util/response';
import appService from '../service/Service';
import log from '../util/log';
import ImgModel from '../model/imgModel';

@Controller("/api/web")
export default class ExampleRouter {

    @Http({
        url: "/next",
        method: "post",
        validate: {

        }
    })
    async next(ctx: Koa.Context) {
        let img = await ImgModel.findOne({ status: 0 });
        if(!img){
            ctx.body = new CodeAndMessage(-1, "图片处理完成");
            return;
        }
        await Redis.instance.hset("showing", "name", img.name);
        await Redis.instance.set(img.name, 0);
        while (true) {
            let flag = false;
            await new Promise((resolve, reject) => {
                setTimeout(async () => {
                    console.log(`img name : ${img.name} waiting update`);
                    let status = Number(await Redis.instance.get(img.name));
                    console.log(status);
                    if (status) {
                        flag = true;
                        console.log("更新好了");
                    };
                    resolve();
                }, 1000);
            });
            if (flag) {
                break;
            }
        }
        ctx.body = new ResSuccess({name: img.name});

    }

    @Http({
        url: "/show",
        method: "post",
        validate: {

        }
    })
    async show(ctx: Koa.Context) {
        let showing = await Redis.instance.hget("showing", "name");
        await Redis.instance.set(showing, 1);
        ctx.body = {
            name: showing
        };
    }
}

