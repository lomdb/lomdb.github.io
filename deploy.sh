echo "Getting ready for deployment"
git push git@github.com:alirebleco.git --delete gh-pages
npm run build
cd dist || exit
echo "1"
git init
echo "2"
git add -A
echo "3"
git commit -m 'deploy'
echo "4"
git push -f git@github.com:alirebleco.git master:gh-pages
echo "5"