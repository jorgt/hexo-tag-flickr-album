# hexo-tag-flickr-album

> Not 3.0.0 compatible yet. Fix is in the works. 

[Hexo.io](http://hexo.io/) is a full featured static site generator for Node. It supports plugins extending it's functionality, in this case a [tag](http://hexo.io/docs/plugins.html#Tag).

This tag display a full Album from Flickr on your hexo powered blog or site. It is also a work in progress. Please log any issues on github. 

## Demo

Here's a [demo](http://jorg.thuijls.net/2014/10/17/Flickr-Album-Tag-Demo/)

## Install

Hexo-tag-flickr was already taken, so... hexo-tag-flickr-album it is. 

```shell
npm install hexo-tag-flickr-album --save
```

## Setup

Add your flickr key to  `_config.yml`. You can get one on flickr's developer page. 

```yml
flickr_key: <your_key>
```

## Usage


```ejs
{%- flickr-album album_id display_type size %}
```

and 

```ejs
{%- flickr-gallery gallery_id display_type size %}
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
`h`   large 1600, 1600 on longest side†
`k`   large 2048, 2048 on longest side†

#### Display

Defaults to **simple** when none given.

**simple**, which just displays all pictures underneath each other.
**fancybox**, use in combination with fancybox. This will load jQuery, Fancybox and Fancybox CSS from cdnjs if not loaded. 

#### CSS

Every gallery is loaded into a div with class `flickr-gallery`, in case you want to add your own CSS. 
