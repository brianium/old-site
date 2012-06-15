---
layout: post
description: "Setting up a blog with Jekyll and Github pages is a snap. This post will cover the steps to get a blog up and running on Github pages"
title: "Blogging With Jekyll And Github Pages"
---

WordPress is a great platform, but there is just too much junk in the trunk for me. I don't really have a need to take advantage of the beast that is
TinyMCE, and I don't really need all the fancy plugins. I wanted to trim some of the fat.

I decided to go the route many developers seem to be taking these days. Github pages and Jekyll. I shall guide you through the very journey I took!

What Is Jekyll?
---------------

Who can say it better than the creators of Jekyll? According to the <a href="https://github.com/mojombo/jekyll/wiki" target="_blank">wiki</a>:

> Jekyll is a simple, blog aware, static site generator. It takes a template directory (representing the raw form of a website), runs it through Textile or Markdown and Liquid converters, and spits out a complete, static website suitable for serving with Apache or your favorite web server. 

* * *

Installing Jekyll
-----------------

Jekyll is installed as a ruby gem. To install Jekyll and all of its dependencies, do so via a terminal:

{% highlight bash %}
$ sudo gem install jekyll
{% endhighlight %}

* * *

The Jeykll Directory Structure
------------------------------

### The Project Folder ###

Since we are using our Jekyll powered blog on Github, we will need to make sure our directory follows a convention. The convention for a Github page is yourusername.github.com.

So for my blog, I created a project directory like so:

{% highlight bash %}
$ mkdir brianium.github.com
{% endhighlight %}

### \_includes ###

The \_includes directory is where we store reusable components. A resuable component is anything you would want repeated across pages or layouts. I used this directory to store things like header, footer, and sidebar templates.

### \_layouts ###

The \_layouts directory is the place to store layouts. You can specify the layout for a given page, post, or even another layout by using the YAML front matter syntax:

{% highlight yaml linenos %}
---
layout: post
title: "The Post To End All Posts"
---
{% endhighlight %}

### \_posts ###

And now a surprising revelation! The \_posts directory stores posts! This is where you will add all of your brilliant brain dumps and discoveries.

### \_site ###

The \_site folder will be created for you as a result of compiling your Jekyll blog. This is the "public" directory of your site. Every request will be served from this directory.

### css, js, images, etc.. ###

You can create any directory you want inside of the project folder. Any directory added this way will be added to the \_site directory at compile time.

I used this feature to create directories for css, js, images, demos, and downloads.

* * *

The \_config.yml File
---------------------

The \_config.yml file is used to store configuration and site-wide variables. At the very least it should store the server port you will use for local testing and the permalink structure:

{% highlight yaml linenos %}
server_port: 4000
permalink:   date
{% endhighlight %}

If you were to add your own variable, say `site_title`, it can be accessed in your posts, pages, and layouts like so:

{% highlight rhtml %}
<%= site.site_title %>
{% endhighlight %}
* * *

Creating Layouts
----------------

Layouts give structure to your content. They live in the \_layouts directory.

You can specify which layout to use in your various posts, pages, and even other layouts with the YAML front matter. If you want to use the post layout on a post, you would start your post file off like so:

{% highlight yaml %}
---
layout: post
---
{% endhighlight %}

Now for a couple of wisdom bits to get you started.

### Break Up Common Elements With Includes ###

The \_includes is used to include reusable template compents. I used this directory to accomplish things like WordPess themes do with header.php, footer.php, and sidebar.php.

You can include these in posts, pages, and layouts with the include syntax.

{% highlight rhtml %}
<% include header.html  %>
{% endhighlight %}

You can see all the includes I use in this blog in the <a href="https://github.com/brianium/brianium.github.com" target="_blank">github repo</a>.

### The Default Layout ###
This fella is ideal for homepage material. Just create a file called default.html in the \_layouts directory. Here is the default.html layout used on my homepage:

{% highlight rhtml linenos %}
<% include head.html %>
<div class="eleven columns alpha">
    <header id="branding">
        <a href="/">
            <hgroup>
                <h1 class="site-heading">Brian Scaturro</h1>
                <h2 class="site-subheading">Fancy a dance?</h2>
            </hgroup>
        </a>
    </header>
    <div id="main" role="main">
        <%= content %>
    </div>
</div>
<% include sidebar.html %>
<% include footer.html %>
{% endhighlight %}

The only thing you really need to include in a layout is the content placeholder:

{% highlight rhtml %}
<%= content %>
{% endhighlight %}

### The Post Layout ###
The post layout lets you give a different structure to the various musings on your blog. Here is the layout I used:

{% highlight rhtml linenos %}
<% include head.html %>
<div class="eleven columns alpha">
    <header id="branding">
        <a href="/">
            <div class="site-heading">Brian Scaturro</div>
            <div class="site-subheading">Fancy a dance?</div>
        </a>
    </header>
    <div id="main" role="main">
        <article>
            <h1><%= page.title %><span class="post-date"><%= page.date || date_to_string %></span></h1>
            <%= content %>
        </article>
    </div>
</div>
<% include sidebar.html %>
<% include footer.html %>
{% endhighlight %}

You can see it isn't much different from the default layout, just some different stuff going on in the header and main div.

Further down we will add Disqus support to this layout so people can comment on posts.

* * *

The Blog Index
--------------

Your home page is powered by the index.html file that goes in the root of the project directory. An index should use the default layout, and access the collection of posts.

The front matter is easy:
{% highlight yaml linenos %}
---
layout: default
title: "Welcome To My Sweet Blog"
---
{% endhighlight %}

A very simple list of posts can be displayed by accessing the `site.posts` collection with Liquid:

{% highlight rhtml linenos %}
<ul class="posts">
    <% for post in site.posts %>
    <li>
        <h3>
            <a href="<%= post.url %>">
                <%= post.title %>
            </a>
            <span class="post-date">
                <%= post.date | date_to_string %>
            </span>
        </h3>
    </li>
    <% endfor %>
</ul>
{% endhighlight %}

* * *

Adding Posts
------------
Jekyll works off of convention for finding posts. It will look in the \_posts directory for files that match your permalink type. 

The permalink type is specified in the \_config.yml file. You can look at the various types <a href="https://github.com/mojombo/jekyll/wiki/Permalinks" target="_blank">here</a>.

To create this post, I added a file named 2012-06-12-blog-with-jekyll-and-github.md to the \_posts directory. You can choose Markdown, Textile, or html files for your posts. Additionally, posts will be run through a Liquid converter.

In addition to permalink naming convention, make sure your posts are using the post layout in the yaml front matter:

{% highlight yaml linenos %}
---
layout: post
title: "How To Keep Your Cereal Crunchy"
---
{% endhighlight %}

* * *

Add An RSS Feed
---------------
Want a feed? No problem! Add an atom.xml file to the project directory, and loop through that `site.posts` collection.

Since we have no need for a layout, specify this is the case in the front matter:

{% highlight yaml linenos %}
---
layout: nil
---
{% endhighlight %}

Then make use of the `site.posts` collection to generate your feed:

{% highlight rhtml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>Brian Scaturro</title>
    <link href="http://brianscaturro.com/atom.xml" rel="self"/>
    <link href="http://brianscaturro.com/"/>
    <updated><%= site.time | date_to_xmlschema %></updated>
    <id>http://brianscaturro.com/</id>
    <author>
        <name>Brian Scaturro</name>
        <email>scaturrob@gmail.com</email>
    </author>
    <% for post in site.posts %>
    <entry>
        <title><%= post.title %></title>
        <link href="http://brianscaturro.com<%= post.url %>"/>
        <updated><%= post.date | date_to_xmlschema %></updated>
        <id>http://brianscaturro.com.com<%= post.id %></id>
        <content type="html"><%= post.content | xml_escape %></content>
    </entry>
    <% endfor %>
</feed>
{% endhighlight %}

Done-zo!

* * *

Add A Sitemap XML File
----------------------

This is not unlike the atom.xml file. Same front matter and everything. Create sitemap.xml in the project directory and add the following after the front matter (changing the relevant bits for your blog of course):

{% highlight rhtml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    <url> 
        <loc>http://brianscaturro.com/</loc>
        <changefreq>daily</changefreq> 
        <priority>1</priority> 
    </url>
    <% for page in site.posts %>
    <url>
        <loc>http://brianscaturro.com<%= page.url %></loc>
        <lastmod><%= page.date | date: "%Y-%m-%d" %></lastmod>
        <changefreq>monthly</changefreq>
    </url>
    <% endfor %>
</urlset>
{% endhighlight %}

* * *

Syntax Highlighting With Pygments
---------------------------------

Jekyll makes use of Python Pygments to do its highlighting magic. It is pretty easy to install, and can be done with a one-liner at the terminal. It <a href="https://github.com/mojombo/jekyll/wiki/install" target="_blank">varies</a> by operating system, but on Ubuntu I ran the following:

{% highlight bash %}
$ sudo apt-get install python-pygments
{% endhighlight %}

### Using Pygments ###

To highlight code, just wrap your code blocks in the highlight tag and choose a <a href="http://pygments.org/docs/lexers/" target="_blank">lexer</a>:

{% highlight rhtml linenos %}
<% highlight html linenos %>
<p>
    The quick brown fox was quick and a fox.
</p>
<% endhighlight %>
{% endhighlight %}

You will also need to generate the pygment css file. There are several <a href="http://pygments.org/docs/styles/" target="_blank">styles</a> to choose from, but I chose monokai. You can generate the css file via the command line:

{% highlight bash %}
$ pygmentize -S monokai -f html > css/pygments.css
{% endhighlight %}

You can then include pygments.css in your layout and you are good to go. Oddly enough, I had to make some additions to the generated css file to get things looking the way I wanted:

{% highlight css linenos %}
.highlight {
    margin-bottom:20px;
}

    .highlight pre {
        background:#444;
        color:#fff;
        padding:5px;
        -moz-border-radius:3px;
        -webkit-border-radius:3px;
        border-radius:3px;
        overflow:auto;
        -webkit-overflow-scrolling: touch;
    }
{% endhighlight %}

* * *

Support Comments With Disqus
----------------------------

There is a nice JavaScript solution for comments called Disqus. Head over to their <a href="http://disqus.com/" target="_blank">site</a> and signup.

You will be given a script, and the place to paste it is your post layout.

* * *

Test Locally
------------

It's easy to to test locally. `cd` into your project directory via terminal and run the following:

{% highlight bash %}
$ jekyll --auto --server
{% endhighlight %}

The --auto flag says listen for changes to files, and recompile automatically when a change happens (good for development). The --server flag starts the server to test on. 

This will use the port specificed in the \_config.yml file (in our case 4000). You can visit your sweet Jekyll site by pointing your browser to http://localhost:4000.

Don't panic if your Disqus comments aren't working locally. You can verify they are working after deploying to Github.

* * *

Deploy To Github Pages
----------------------

Deploying to Github is a snap. Github will auto-magically make a page for you if you create a public repository with the convention yourusername.github.com, and this is why we named our project folder with this convention.

Initialize the git repo in your project directory, commit, then push. Your first push will require 10 minutes to allow Github to publish your page. After that, pushes will have your changes showing up almost instantly.

> A Github page is created for you when you create a public repo called yourusername.github.com

* * *

Use A Custom Domain
-------------------

It may be the case that you want to use your own domain for your blog. No problem. It's as easy as adding a file to your repository.

### The CNAME File ###

Create a file called CNAME and add it to your project directory. It should have a line containing your sub-domain or top level domain. My particular CNAME file has this one line:

{% highlight bash %}
brianscaturro.com
{% endhighlight %}

Add this file to your repository, and push it!

### Update "A" Record and CNAME Records ###

You will have to hit up your domain registrar and change the 'A' record for your domain to point to the following ip: 204.232.175.78

Change your www CNAME record to point to yourusername.github.com, in my case brianium.github.com.

Wait for the changes to propagate and you are good to go!

Conclusion
----------

There is a bit of setup involved, but once it's done, you will find it is pretty easy to whip up posts.

The benefits are amazing:

* Flexibility of being powered by a Github repo, push from anywhere and voila, blog updated!
* Free hosting a'la Github. Can't beat free.
* Portability. It's static html. Don't like Github pages? Drag your static html to any web server.

Migration tools are available as well if you are worried about losing posts from another system. Check out <a href="https://github.com/mojombo/jekyll/wiki/blog-migrations" target="_blank">this</a> page on Github.

Don't forget to checkout this blog's source on Github.

<a href="https://github.com/brianium/brianium.github.com" target="_blank" class="button">The Source</a>

Please feel free to share additional tips and feedback in the comments.