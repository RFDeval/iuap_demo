package com.yonyou.iuap.base.commons;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequestMapping("/commonweb")
@RestController
public class CommonController {

    @RequestMapping("/getuuid")
    public String getuuid(){
        return UUID.randomUUID().toString();
    }
}
