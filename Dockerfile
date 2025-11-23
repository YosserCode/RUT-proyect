# Etapa de construcción con Maven
FROM maven:3.8.6 AS build
WORKDIR /app
COPY . .
RUN mvn clean package

# Etapa de ejecución con Temurin OpenJDK 17
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENV JAVA_HOME /usr/local/openjdk-17
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
