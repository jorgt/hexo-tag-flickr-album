# hexo-tag-flickr-album

[Hexo.io](http://hexo.io/) is a full featured static site generator for Node. It supports plugins extending it's functionality, in this case a [tag](http://hexo.io/docs/plugins.html#Tag).

This tag display a full Album from Flickr on your hexo powered blog or site. 

It works but it's in the early stages. I plan on adding a tag to this for other Flickr functionality too and set it up so it can be used with Fancybox. This is all in the to-do pile...

## Install
```
npm install --save hexo-tag-flickr-album`
```
Add the following entry in `_config.yml`:

```
flickr_key: <your_flickr_key>
```
## Usage

In any page or post, use the tag:
```
{%- flickr-album <album id> %}
```

You can find the ID in the url of an album on Flickr.