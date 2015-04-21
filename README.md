# Building a plugin

This workshop is aimed at guiding you through the process of building a UI plugin using Mobify's plugin factory. It will guide you through a few steps, including:

1. Generating a plugin scaffold using the [plugin generator](https://github.com/mobify/generator-plugin)
2. Understanding the structure of the plugin factory
3. Building up your plugin step by step
4. Writing tests for your plugin

### What we're building

We're going to build a credit card validator and identifier plugin, conveniently (or annoyingly) called `seesee`. This plugin is going to have the following requirements:

1. Bind itself to elements of type `input`
2. Identify the card type while typing
3. Validate the card while typing

## Workshop Pre-requisites

You will need a few things installed to build plugins using this workshop.

### Grunt

You need grunt:

```cli
[sudo] npm install -g grunt-cli
```

### Bower

You need bower:

```cli
[sudo] npm install -g bower
```

### Yeoman
 
You need yeoman:

```cli
[sudo npm install -g yo
```

### generator-plugin

You'll need the yeoman generator for building plugins:

```cli
git clone https://github.com/mobify/generator-plugin.git && [sudo] npm link
```

The `[sudo] npm link` command will install the plugin generator in your local yeoman.

## Ready to start?

Once you're ready to begin, run the following command in your terminal:

```cli
git checkout step-1-generate-plugin
```

Then, follow the directions in that branch's [README](https://github.com/mobify/workshops--building-a-plugin/blob/step-1-generate-plugin/README.md)
