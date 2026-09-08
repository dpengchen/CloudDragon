package uno.rocc.dragon.cloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class DragonCloudSystemApplication {
    public static void main(String[] args) {
        System.setProperty("nacos.server.grpc.port.offset", "1");
        SpringApplication.run(DragonCloudSystemApplication.class, args);
    }
}