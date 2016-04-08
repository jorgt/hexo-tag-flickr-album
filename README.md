# hexo-tag-flickr-album

1/3/2016: No longer actively maintained because I moved away from Hexo. 

> Now version 3.x compatible.  

[Hexo.io](http://hexo.io/) is a full featured static site generator for Node. It supports plugins extending it's functionality, in this case a [tag](http://hexo.io/docs/plugins.html#Tag).

This tag display a full Album from Flickr on your hexo powered blog or site.Please log any issues on github. 

## Demo

Here's a [demo](http://jorg.thuijls.net/flickr-album-tag-demo.html)

## Versions

Hexo changed the way tags worked between versions 2.x and 3.x. The main difference is that we can now have asynchronous tag renderer. From the [doco](https://github.com/hexojs/hexo/wiki/Breaking-Changes-in-Hexo-3.0):

    Since Hexo 3, we use Nunjucks instead of Swig for post rendering. They share simliar syntax but Nunjucks provides async rendering. 

which means I am now able to change the awkward flickr rendering the first version used. See, Flickr needs an API call to get album and photo information. Version 1 of this tag injected a script into the renderered HTML, which did all the fetching and transforming. This can now be done by Hexo: less work for the browser! 

The drawback concerning this tag? Can't seem to get the dash in the tag name to work: `flickr-album` is now `flickr album`, and `flickr-gallery` is now `flickr gallery`.

## Installation

Hexo-tag-flickr was already taken, so... hexo-tag-flickr-album it is. 

```shell
npm install hexo-tag-flickr-album@3.x --save
```

## Setup

Add your flickr key to  `_config.yml`. You can get one on flickr's developer page. 

```yml
flickr_key: <your_key>
```

## Usage

```ejs
{%- flickr album album_id display_type size %}
```

and 

```ejs
{%- flickr gallery gallery_id display_type size %}
```


## Legacy

Tag usage is slightly different for the older versions of hexo. Setup is the same: add your flickr API key to `_config.yml`.

### Installation for Hexo 2.x

```shell
npm install hexo-tag-flickr-album@"< 3" --save
```

### Usage for hexo 2.x


```ejs
{%- flickr-album album_id display_type size %}
```

and 

```ejs
{%- flickr-gallery gallery_id display_type size %}
```

## A word on available sizes

Size, from [Flickr](https://www.flickr.com/services/api/misc.urls.html). This tag defaults to `b` when unspecified:

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

## Display

Defaults to **simple** when none given.

**simple**, which just displays all pictures underneath each other.
**fancybox**, use in combination with fancybox. This will load jQuery, Fancybox and Fancybox CSS from cdnjs if not loaded. 

#### CSS

Every gallery is loaded into a div with class `flickr-gallery`, in case you want to add your own CSS. 
