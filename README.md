##Form builder

It handle forms creation with features like different templates. It is based on bootstrap theme.

##how to run
###for development env.
```js
 broccoli serve
```
then go to localhost:4200


##todo
* rather than using bower for managin dependency use npm for connecting to modules and use es6 modules to require them.
* put cover on the element edit/render states so that states can be switched easily
* put position id also on the element so that the desired element can be positioned easily
* add attribute should only add attribute markup in ui rather than re-rendering whole edit view


##issues
* while adding multiple attributes without saving previous one gets removed because in controller previous is still not saved.
* <s>issue in attribute reading process is mainly because of attribute matching in generateeditinfo function in controller i think. Check this function properly. In my opinion the issue is that label is not reconstructed properly.</s>
* <s>after save label is not read properly when adding attributes</s>
* <s>also the earlier repeated attributes are getting shown rather than their isSelected property getting added.</s>
