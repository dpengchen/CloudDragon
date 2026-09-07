package uno.rocc.dragon.cloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient 
@SpringBootApplication 
public class DragonCloudGatewayApplication {
    public static void main(String[] args) {
        System.setProperty("nacos.server.grpc.port.offset", "2");
        SpringApplication.run(DragonCloudGatewayApplication.class, args);
    }
}