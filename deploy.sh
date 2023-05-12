echo "Getting ready for deployment"
# git push git@github.com:a11y.git --delete gh-pages
npm run build
# cd dist || exit
# git init
# git add -A
# git commit -m 'deploy'
# git push -f git@github.com:a11y.git master:gh-pages