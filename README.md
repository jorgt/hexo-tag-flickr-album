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

To load an album in any page or post, use the tag:
```
{%- flickr-album <album id> %}
```

To load a gallery, use this tag:
```
{%- flickr-gallery <gallery id> %}
```

You can find the ID in the url of an album or gallery on Flickr.

## Options 

```
{%- flickr-gallery <album id> <size> <display type> %}
```

#### Size

Size, from [Flickr](https://www.flickr.com/services/api/misc.urls.html), defaults to `b`:

`s`   small square 75x75
`q`   large square 150x150
`t`   thumbnail, 100 on longest side
`m`   small, 240 on longest side
`n`   small, 320 on longest side
`-`   medium, 500 on longest side
`z`   medium 640, 640 on longest side
`c`   medium 800, 800 on longest side†
`b`   large, 1024 on longest side*
`h`  large 1600, 1600 on longest side†
`k`   large 2048, 2048 on longest side†

#### Display

At this point, only "simple" is allowed, which is just displaying all photos in a list. 