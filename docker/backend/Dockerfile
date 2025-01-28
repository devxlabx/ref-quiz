#Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
#to download dependencies even offline
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package

#Runtime stage
FROM eclipse-temurin:17-jdk-alpine
#arguments to add
ARG APP_VERSION=1.0.0-SNAPSHOT
WORKDIR /app
#copy the builded app to my work directory
COPY --from=build /build/target/refquiz-api*.jar /app/
EXPOSE 8080
#creating variable env to add theme to cmd
ENV DB_URL=jdbc:postgresql://postgres-sql-refquiz:5432/refquiz_db
ENV JAR_VERSION=${APP_VERSION}
#cmd to run my app
CMD java -jar -Dspring.datasource.url=${DB_URL} refquiz-api-${JAR_VERSION}.jar