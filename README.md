# is-this-an-mlm

[Website](http://www.isthisanmlm.com) to tell people whether a company is an MLM.

## MLMs

See the [index](pages/index.vue) for a list of all recognized MLMs. Feel free to add/make corrections via a pull request. Original list was adapted from [r/antiMLM](https://old.reddit.com/r/antiMLM/comments/9aolhe/is_an_mlm_check_here_mega_thread_list/?utm_content=title&utm_medium=hot&utm_source=reddit&utm_name=antiMLM).


##

Running this.

1) frontend
```
> cd frontend
> npm install
> npm run generate
> http-server -p80 -d false dist
```
Substitute any http server you want.

2) backend
```
> cd backend
> poetry install
> poetry run python mlm_backend
```
`poetry` must be installed for this.
