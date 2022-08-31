require("dotenv").config()
const Mustache = require("mustache")
const axios = require("axios").default
const fs = require("fs")
const MUSTACHE_MAIN_DIR = "./main.mustache"

const getStats = async () => {
	const {
		data: { data },
	} = await axios.get(
		"https://public-api.tracker.gg/apex/v1/standard/profile/5/raviolijapgawd",
		{ headers: { "TRN-Api-Key": process.env.API_KEY } }
	)
	const legend = data.children[0]
	let stats = {
		legend_name: legend.metadata.legend_name,
		legend_img: legend.metadata.icon,
		account_level: data.metadata.level,
		stats_key: data.stats[1].metadata.key,
		stats_value: data.stats[1].value,
	}
	fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
		if (err) throw err
		const output = Mustache.render(data.toString(), stats)
		fs.writeFileSync("README.md", output)
	})
}

getStats()
