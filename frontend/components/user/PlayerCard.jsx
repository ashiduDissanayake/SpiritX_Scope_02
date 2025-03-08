              <span className={styles.statLabel}>Economy Rate:</span>
              <span className={styles.statValue}>{formatNumber(player.economyRate)}</span>
            </div>
          </div>

          <div className={styles.playerValue}>
            <h4>Player Value:</h4>
            <span>{formatCurrency(player.value)}</span>
          </div>
        </div>
      )}

      {showActions && !isInTeam && (
        <div className={styles.actions}>
          <button 
            onClick={handleAddPlayer} 
            disabled={loading || isInTeam}
            className={styles.addButton}
          >
            {loading ? 'Adding...' : 'Add to Team'}
          </button>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      )}

      {showActions && isInTeam && (
        <div className={styles.inTeamBadge}>
          Already in your team
        </div>
      )}
    </div>
  );
}