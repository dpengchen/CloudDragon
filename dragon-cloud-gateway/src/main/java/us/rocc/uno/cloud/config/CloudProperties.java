package us.rocc.uno.cloud.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;



@Data 
@Component 
@ConfigurationProperties(prefix = "spring.database")
public class CloudProperties{

    private String url;
    private String username;
    private String password;

}