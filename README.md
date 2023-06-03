# SwissPedHealth PipeDev landing

This is the initial README for the PipelineDev page:
<https://swisspedhealth-pipelinedev.github.io>.

## Cloning and keys
### Summary
Instead of the default method for cloning, if:
1. you have a ssh key set up for your github account and 
2. you are an organisation member, you can specify your username for github to clone:

`git clone git@dylanlawless.github.com:SwissPedHealth-PipelineDev/SwissPedHealth-PipelineDev.github.io.git`

Then set the local user 
`cd docs`
`git config user.email personemail@addess.com`
`git config user.name DylanLawless`

### Datails of why this is done
Since I work with others and use different accounts, machines, emails, here are some notes incase you or I need them.

To push to multiple github accounts with different keys,
and different machines, these settings can be used.
Instead of a global git config, local configs are used for each repo.
Here is the example with two of my repos.
The custom usernames for the local repo is shown (but custom email is removed to prevent spam).
[Create your ssh keys as per github recommendation](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). 
In the .ssh directory, the config file will assign the key to each git repository that you clone based on the Host that you use. i.e. custom instead of the default:

* git clone git@custom.github.com:accout/repo.git
* git clone git@github.com:accout/repo.git


``` bash 
## Set up the ssh config file
cd ~/.ssh/config

## set such that Host and User are custom
# lawlessgenomics repo
Host dylanlawless.github.com
  HostName github.com
  User DylanLawless
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/key1_rsa
  IdentitiesOnly yes

# other repo
Host otherrepo.github.com
  HostName github.com
  User username
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/key2_rsa
  IdentitiesOnly yes

```

Then clone your repo using the custom Host instead of the default provided by github when you use button "clone/ssh/copy".

``` bash
# Clone using the correct Host as per config.
# As shown at the end of this page, you may need to clone with submodules.
# You can do by add the "--recursive" flag. 
git clone --recursive git@dylanlawless.github.com:SwissPedHealth-PipelineDev.github.io.git

# Set the local user here (instead of global, i.e. /Users/user/.gitconfig)
cd "the cloned repo dir"
git config user.email personemail@addess.com
git config user.name DylanLawless
```

You should now be able to pull and push from that repo without the ["incorrect user" problems](https://stackoverflow.com/questions/4665337/git-pushing-to-remote-github-repository-as-wrong-user).


