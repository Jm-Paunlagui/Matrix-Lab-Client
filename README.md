# Matrix (Sentiment-Analysis)

### Requirements

1. [Git](https://git-scm.com/downloads) must be installed.
2. **IF YOU WANT TO CONTRIBUTE** [GPG](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key) Signing Key must be configured for your commits to be verified
   1. These links will help you setup your gpg incase you don't have one setup
      1. Generating a [new GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
      2. [Telling Git about your signing key](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key).
      3. [Gpg4win](https://gpg4win.org/download.html) **_Remember your Passphrase_**
      4. Source Control Tip 19: [Signing a commit via GPG](https://www.youtube.com/watch?v=2ISu2KTPzuQ)
   2. Creating a [branch](https://www.atlassian.com/git/tutorials/using-branches/git-checkout#:~:text=New%20Branches&text=The%20git%20branch%20command%20can,to%20switch%20to%20that%20branch.)
   3. Managing [branches](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/making-changes-in-a-branch/managing-branches)
   4. About [Pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
3. [Node.js](https://nodejs.org/en/) must be installed.
4. Your IDE/Text editor of your choice. Mine is [WebStorm](https://www.jetbrains.com/webstorm/promo/?source=google&medium=cpc&campaign=9641686236&term=webstorm&gclid=Cj0KCQjw39uYBhCLARIsAD_SzMRjkWgL8KSWIkbC7ub_CTzDX6l1SoHQboQd4I4lvQ4pumpIBmGHgcYaAgKXEALw_wcB) and [VS Code](https://code.visualstudio.com/download)
   1. Optional, my ext in vs code/webstorm
      1. [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
      2. [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind)
      3. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
      4. [sort-imports](https://marketplace.visualstudio.com/items?itemName=amatiasq.sort-imports)
      5. Github Copilot (Free for [students](https://education.github.com/benefits?type=student))
         1. [In VS Code](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
         2. [In WebStorm](https://plugins.jetbrains.com/plugin/17718-github-copilot)
5. To run the project

   1. Yarn will be the new package manager for the project

   - To enable yarn package manager to nodejs

     - run your terminal as administrator and run `corepack enable` to enable yarn package manager. see the [documentation](https://yarnpkg.com/getting-started/install) in yarn.

     Now that we enabled the corepack we can now use the yarn package manager, proceed to next step

   - Open your terminal to the directory you want to place the project (in my case it's in the desktop, so feel free to choose the directory of this project on your own.) and paste this `git clone https://github.com/Jm-Paunlagui/Matrix-Client.git`
   - Go to the directory of project by typing `cd Matrix-Client/client`
   - Install the node_modules run `yarn`
   - After installing the modules you can now run the project by `yarn start`
