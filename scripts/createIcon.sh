sizes=(16 24 32 48 64 128 180 256)
files=("favicon")

for f in ${files[@]}; do
  for s in ${sizes[@]}; do
    convert ${f}.svg -resize ${s}x${s} ${f}_${s}x${s}.png
  done
done