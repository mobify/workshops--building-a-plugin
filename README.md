# Step 1 - Generate the plugin scaffold

Since you've already installed the `generator-plugin` yeoman generator (and I know you have!), we can generate our plugin scaffold very easily. The scaffold comes with a structure like this:

## Task:

1. Start the plugin generator using the following command in your terminal:

  ```cli
  yo plugin
  ```

1. We're going to call our plugin **seesee**. Enter that now.
1. When prompted for a description, enter: **A mobile first credit card mask and validator**.
1. When prompted about whether or not to use Velocity, choose **no (n)**.
1. When prompted as to whether our plugin requires a theme file, choose **no (n)**.

Once you enter the above, your plugin will be generated by yeoman. 

**Note** during the generation of the plugin you may be prompted about a conflict with the README.md. When prompted, select **n** to not overwrite the file, and hit enter.

## Ready to Continue?

Once you're ready to continue, run the following command in your terminal:

```cli
git clean -fd && git checkout step-2-initialize && npm install && bower install
```

Then, follow the directions in that branch's [README](https://github.com/mobify/workshops--building-a-plugin/blob/step-2-initialize/README.md)
