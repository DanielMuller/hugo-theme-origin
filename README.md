# Origin : A Hugo theme

Origin is a single-column [AMP](https://www.ampproject.org/) theme for [Hugo](https://gohugo.io/). Its ported from [Origin theme for Wordpress](https://alienwp.com/themes/origin/).

The AMP specific parts where taken from [gohugo-amp starter theme](https://gohugo-amp.gohugohq.com/).

## Features
* Google Analytics
* Pagination
* Social sharing (can be disabled by content)
* Tags (optional)
* Categories (optional)
* Disqus
* Schema

# Theme assumptions
* All blog posts are of the type `post`
* Homepage displays a paginated list of content from the post section

# Installation

## Installing the theme
```bash
cd $website_root
mkdir themes
cd themes
git clone https://github.com/DanielMuller/hugo-theme-origin origin
rm -rf origin/.git // To avoid conflicting with the website's git configuration
```

## Install HTML minifier
Read the styling section at [GOHUGO AMP](https://gohugo-amp.gohugohq.com/styling/) for more infos.
```bash
cd $website_root
npm i
```

## Building the website
```bash
cd $website_root
npm run build:prod
```

# Configuration
**config.toml**

Some configurations parameters where changed from the original Casper for Hugo theme.

```toml
languageCode = "en"
title = "My awesome blog"
baseURL = "http://example.com/"
theme = "origin"

[permalinks]
    post = '/:year/:month/:slug/' # Wordpress style

# Define the default author
[author]
    name = "Jonn Doe"
    bio = "The most uninteresting man in the world."
    shortbio = ""
    location = "Normal, IL"
    website = "http://example.com"
    twitter = ""
    github = ""
    linkedin = ""
    flipboard = ""

[params]
    description = "my tagline"
    logo = "/logos/logo.png"
    locale = "en_US"

    ampElements = ["amp-analytics","amp-iframe"] # AMP elements loaded on every page
    themeColor = "#ffffff" # Browser bar color
    googleanalytics = "UA-1341906-9"

    defaultSchema = "article"
    iframedomain = "iframe.example.com" # for amp-iframe integration
    disqusShortname = ""

# Where can we share?
[params.share]
    twitter = true
    gplus = true
    pinterest = true
    facebook = true
```

## Favicon
Favicons parameters are defined under *params.favicon* in your site's *config.toml*
```toml
[params.favicon]
    manifest = "manifest.json"
    basename = "/logos/favicon"
    ms_tilecolor = "#FFFFFF"
    icon = [16, 32, 96, 192]
    apple_touch = [57, 60, 72, 76, 114, 120, 144, 152, 180]
    ms = [144]
    ms_config = "browserconfig.xml"
```
You files need to be put in `/static/`, using any subfolder you define in `basename` and need to be named according to the params:
- favicon-&lt;w&gt;x&lt;h&gt;.png
- favicon-manifest.json
- favicon-browserconfig.xml

You can add *favicon.ico* to the static root for legacy browsers.

## Taxonomies
The theme assumes the existence of 2 taxonomies: **Tags** and **Categories**, they don't need to be used.

## Multiples authors
Additionals authors can be defined in `data/authors/author_key.toml`

The *author_key* needs to be provided as the author in the *Front Matter*.

**jane.toml**
```toml
GivenName = 'Jane'
FamilyName = 'Doe'
DisplayName = 'Jane Doe'
Thumbnail = ""
Image = ""
ShortBio = "It's me"
LongBio = "It's really me"
[social]
    facebook    = ""
    github      = ""
    twitter     = ""
    googleplus  = ""
```
**post/i-am-jane.md**
```md
+++
author = "jane"
title = "I am Jane"
slug = "i-am-jane"
+++

Hi! My name is Jane
```

When the *author_key* can't be found, the default author is used.

## Opengraph, Twitter Cards
Most existing data will be used, but some parameters can be added in *config.toml* and *Front Matter* to enhance the opengraph and twitter cards data

**config.toml**
```toml
[params]
    locale = "en_US"
[author]
    facebook = 'authorfbpage' # Author's Facebook page
    twitter = 'Author Twitter handle'
```

When using multiple authors, the *facebook* or *twitter* attribute can be added to each author's data.

**Front Matter**
```toml
locale = "fr_CH"
images = ['a.jpg', 'b.jpg'] # If not provided, image will be used
audio = 'a.ogg'
videos = ['a.mp4', 'b.mp4']
series = ['first', 'another'] # You need to add Taxonomies.series to your site
description = 'Altername description for Facebook/Twitter' # If not provided, excerpt or summary are used
```

## Google News
**Front Matter**
```toml
news_keywords = ['word1', 'word2']
```

## Schema.org
**config.toml**
```toml
[params]
    alternatePageName = 'Alternate name'
# Organization
    organizationName = ''
    socialProfiles = ''
    organizationLogo = ''
    organizationAddress = ''
# Breadcrumb
    breadcrumbOnPath = false
# Default schema type
    defaultSchema = 'article' # recipe, course are valid too
```

**Front Matter**
```toml
[structured]
    type = 'article' # recipe, course are valid too
# For article
[article.image]
    src = ''
    # ...
# For course
[provider]
    name = ''
    url = ''
# For recipes
[recipe]
    category = ''
    prepTime = ''
    # ...
[recipe.image]
    src = ''
    # ...
[rating]
    value = ''
    # ...
[nutrition]
    servingSize = ''
    # ...
```

# Adding content
```bash
hugo new post/my-post.md
```
## Front Matter
To automatically populate the *Front Matter* with Hugo 0.19, you need to define the theme in use in *config.toml*.
```toml
draft = true
title = "Post title"
slug = "post-title"
tags = ["tag1","tag2"]
categories = ["cat1","cat2"]
image = ""
comments = true # set false to hide Disqus (Disqus is not implemented yet)
menu= ""        # set "main" to add this content to the main menu
author = "" # Use default or author_key from data/authors
noauthor = true # Hides the author on the post

[amp]
    elements = ["amp-social-share"]
    # Adding amp-social-shares enables page sharing. Do not load amp-social-share to disable sharing.
```
## AMP
To have your pages AMP valid, you need to write valid AMP content. To use an AMP element not loaded by default, you need to add it to your content page in the *Front Matter*
```toml
[amp]
    elements = ["amp-image-lightbox", "amp-social-share"]
```

AMP elements can be inserted with shortcodes. Shortcodes for most of the AMP elements have been defined by the [gohugo-amp](https://gohugo-amp.gohugohq.com/shortcodes/) project.
```md
{{< amp-image-lightbox id="myimage" >}}
{{< amp-image
  alt="ALT text"
  src="/images/my-image.png"
  srcset="/images/my-image-small.png 300w, /images/my-image-medium.png 730w, /images/my-image.png 1024w"
  width="300"
  height="300"
>}}
```

# Modifying the theme

## Styles
Styles need to be defined in the header of each page. The stylesheet is a partial in `themes/campser/layouts/partials/styles/stylesheet.html` with it's sources in `themes/origin/layouts/partials/styles-src/styles.scss`. To rebuild the stylesheet, you need to have a working `node`install and install the relevant dependencies.
```bash
cd themes/origin
npm i
npm run build
```
Read the styling section at [GOHUGO AMP](https://gohugo-amp.gohugohq.com/styling/) for more infos.
