# TS Convict  

[![NPM version](http://img.shields.io/npm/v/ts-convict.svg)](https://www.npmjs.com/package/ts-convict) [![Build Status](https://travis-ci.com/kferrone/ts-convict.svg?branch=master)](https://travis-ci.com/kferrone/ts-convict) [![Coverage Status](https://coveralls.io/repos/github/kferrone/ts-convict/badge.svg?branch=master)](https://coveralls.io/github/kferrone/ts-convict?branch=master)
 
[![GitHub forks](https://img.shields.io/github/forks/kferrone/ts-convict.svg?style=social&label=Fork)](https://github.com/kferrone/ts-convict/fork)
[![GitHub stars](https://img.shields.io/github/stars/kferrone/ts-convict.svg?style=social&label=Star)](https://github.com/kferrone/ts-convict)

Decorate a class to define and validate your configs using [convict](https://www.npmjs.com/package/convict). Brings true serialized class types to your config when loaded. The idea is inspired by projects like [Typeorm](https://typeorm.io/#/) and [Inversify](http://inversify.io/). 

### Quick Links
[Contributing](/CONTRIBUTING.md) | [Changelog](/CHANGELOG.md) | [Convict](https://www.npmjs.com/package/convict) | 
|---|---|---|

## Requirements  

 - [NodeJS 8+](https://nodejs.org/en/)
 - [Typescript 3+](https://www.npmjs.com/package/typescript)
 - [Convict 5+](https://www.npmjs.com/package/convict)

## Features  
 - all the power and then some from convict
 - define convict schemas with decorators
 - get your config as serialized classes
 - simple and intuitive implementation
 - very pretty code for defining your apps config

## Installation  

1. Install the package and dependencies.

`npm install ts-convict convict reflect-metadata --save`  
`npm install @types/convict --save-dev`  

Optionally install a parser of your choice if your config is not JSON. For example you can also use YAML.

`npm install js-yaml --save`

2. Make sure `reflect-metadata` Is configured correctly for Typescript. 

2.1 `tsconfig.json`  
```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

2.2 Import in main file  
`index.ts`  
```typescript
import "reflect-metadata";
```
or import with node command  
`node -r reflect-metadata`

## Project Setup  

First we need a proper project setup like the one below with a folder to hold our config 
schema classes. This is a very simple Typescript folder structure. 

```
MyProject
├── src                  // place of your TypeScript code
│   ├── config           // place where your config entities will go
│   │   ├── MyConfig.ts  // the main config
│   │   ├── Database.ts  // sample database config
│   │   └── SubConfig.ts // a nested config
│   ├── types.d.ts       // place to put your interfaces  
│   └── index.ts         // start point of your application
├── .gitignore           // standard gitignore file
├── config.yml           // Your apps config file
├── db.json              // Your apps other db config as json
├── package.json         // node module dependencies
├── README.md            // a readme file
└── tsconfig.json        // TypeScript compiler options
```

Take note of the `src/config` directory, here we will put our convict schema classes.  
The classes will be annotated with convict schema definitions. This directory can be called whatever you like. 

## Useage  

### 1. Define an Interface  

It's a good idea to define an interface so your experience can be agile and include 
all the fancy IDE features. Interfaces also open an opportunity to have more than one 
implementation of your config, i.e. maybe youswitch to a convict competitor or maybe just have no validation on config at all, i.e. `require('config.json')`. 

`src/types.d.ts`
```typescript
declare namespace config {
    export interface MyConfig {
        name: string;
        subConfig: SubConfig;
        db: Database;
    }
    export interface SubConfig {
        bar: number;
    }
    export interface Database {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    }
}
```

### 2. Define a Schema Class  

Now we can define a schema class and decorate it. The parameter for `@Property` decorator is simply a convict `SchemaObj` like in normal convict. You can read all about the possible options in [convicts documentation](https://www.npmjs.com/package/convict).

`src/config/MyConfig.ts`
```typescript
import { property, config } from 'ts-convict';
import SubConfig from './SubConfig';
import Database from './Database';
import * as yaml from 'js-yaml';

@config({
    file: 'config.yml',// relative to NODE_PATH or cwd()
    parser: { 
        extension: ['yml', 'yaml'], 
        parse: yaml.safeLoad
    }
})
export class MyConfig implements config.MyConfig {
    
    // ts-convict will use the Typescript type if no format given
    @property({
        doc: 'The name of the thing',
        default: 'Convict',
        env: 'MY_CONFIG_NAME'
    })
    public name: string;

    @Property(SubConfig)
    public subConfig: config.SubConfig;

    @Property(Database)
    public db: config.Database;

}
```

`src/config/SubConfig.ts`
```typescript
import { property } from 'ts-convict';

export class SubConfig implements config.SubConfig {
    @property({
        doc: 'A sub prop',
        default: 3,
        env: 'SUB_CONFIG_BAR',
        format: 'int'
    })
    public bar: number;

    public message: string = "I am an unmanaged config property";
}
```

`Database.ts`
```typescript
import { property } from 'ts-convict';

export class Database implements config.Database {
    @property({
        doc: "The database host",
        default: "localhost",
        format: "url",
        env: "DATABASE_HOST"
    })
    public host: string;

    @property({
        doc: "The database port",
        default: 5432,
        format: "port",
        env: "DATABASE_PORT"
    })
    public port: number;

    @property({
        doc: "The database db",
        default: "my_db",
        env: "DATABASE_DB"
    })
    public database: string;

    @property({
        doc: "The database user",
        default: "magik",
        env: "DATABASE_USER"
    })
    public user: string;

    @property({
        doc: "The database pass",
        default: "secretpassword",
        sensitive: true,
        env: "DATABASE_PASS"
    })
    public password: string;
}
```

### 3. Make a Configuration  

Now we can make our configuration for our app. This can be a hardcoded Object in 
your code, a json file, a yaml file, or however you do it. In the end it's up to you 
how you type out and load the data. 

`config.yml`
```yml
name: Cool App
subConfig: 
    bar: 5
db:
    user: devuser
    password: devpassword
```

`db.json`
```json
{
    "user": "someuser",
    "password": "somepassword",
    "host": "somedb.com"
}
```

### 4. Load it up

We have a couple of ways to load it up so you can choose what works for your unique 
situation. The example below is the simplest way in the spirit of TL;DR.

`src/index.ts`
```typescript
import { TSConvict } from 'ts-convict';
import { MyConfig } from "./config/MyConfig";
import { Database } from "./config/Database";
import { SubConfig } from "./config/SubConfig";

// example loading default file defined in @Config
const myConfigLoader = new TSConvict<MyConfig>(MyConfig);
const myConfig: MyConfig = myConfigLoader.load();

// example loading with file passed to load
const dbLoader = new TSConvict<Database>(Database);
const dbConfig: Database = dbLoader.load('db.json');

// example loading an ad hoc config class with raw data
const rawSub: config.SubConfig = {
    bar: 22
};
const subLoader = new TSConvict<SubConfig>(SubConfig);
const subConfig = subLoader.load(rawSub);

```
