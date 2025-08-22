package com.probeco.erp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjetland.jackson.jsonSchema.JsonSchemaConfig;
import com.kjetland.jackson.jsonSchema.JsonSchemaGenerator;

@RestController
@RequestMapping("/schemas")
public class SchemaGenerator {
    private final ObjectMapper mapper;

    public SchemaGenerator() {
        this.mapper = new ObjectMapper();
        // Soporte para records
        mapper.findAndRegisterModules(); // Incluye ParameterNamesModule si está presente
    }

    @GetMapping("/{dtoName}")
    public ResponseEntity<JsonNode> getSchemaForDto(@PathVariable String dtoName) {
        try {
            String basePackage = "com.probeco.erp.dtos";
            Class<?> dtoClass = Class.forName(basePackage + "." + dtoName);

            Class<?>[] groups = new Class<?>[] { javax.validation.groups.Default.class };

            JsonSchemaConfig config = JsonSchemaConfig.vanillaJsonSchemaDraft4()
                .withJavaxValidationGroups(groups);

            JsonSchemaGenerator schemaGen = new JsonSchemaGenerator(mapper, config);
            JsonNode schema = schemaGen.generateJsonSchema(dtoClass);
            
            return ResponseEntity.ok(schema);

        } catch (ClassNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
