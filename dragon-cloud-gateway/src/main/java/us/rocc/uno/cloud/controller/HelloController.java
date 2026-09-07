package us.rocc.uno.cloud.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import us.rocc.uno.cloud.config.CloudProperties;


@RestController 
@RequiredArgsConstructor 
public class HelloController {

    private final CloudProperties cloudProperties;

    @GetMapping("/hello")
    public String getMethodName(@RequestParam String name) {
        return "Hello, " + name + "!";
    }


    @GetMapping("/testConfig")
    public CloudProperties getConfig() {
        System.out.println("cloudProperties: " + cloudProperties);
        return cloudProperties;
    }
    
    
    
}
