chrome.runtime.onInstalled.addListener(() => {
   chrome.action.disable()

   chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      const exampleRule = {
         conditions: [
            new chrome.declarativeContent.PageStateMatcher({
               pageUrl: { hostSuffix: '.youtube.com' },
            }),
         ],
         actions: [new chrome.declarativeContent.ShowAction()],
      }
      const rules = [exampleRule]
      chrome.declarativeContent.onPageChanged.addRules(rules)
   })

   chrome.storage.sync.set(
      {
         badgeText: 'ON',
      },
      () => {
         chrome.action.setBadgeText({
            text: 'ON',
         })
      }
   )
})

chrome.action.onClicked.addListener(() => {
   chrome.storage.sync.get(['badgeText'], (res) => {
      const newBadgeText = res.badgeText === 'ON' ? 'OFF' : 'ON'
      chrome.storage.sync.set(
         {
            badgeText: newBadgeText,
         },
         () => {
            chrome.action.setBadgeText({
               text: newBadgeText,
            })
         }
      )
   })
})
